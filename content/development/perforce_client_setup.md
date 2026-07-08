---
title: Perforce Client Setup
description: Setting up a perforce client on another machine to use the hosted depo on the server
date: 2026-07-08
tags:
    - development
    - perforce
    - versioning
    - tutorial
---

# Perforce Client Setup Guide

This document summarizes how the Perforce version control client was configured on a laptop to ensure seamless, two-way synchronization with the central server (`p4-server.example.com`) for an Unreal Engine project (`MyProject`), avoiding any workspace conflicts.

## 1. Why These Steps Were Necessary (The Problem)

By default, Perforce **binds a specific workspace to a single physical machine (Host)**. When attempting to reuse the exact same client name (`myproject-desktop`) on the laptop that was originally created on the desktop, the system encountered three critical blockers:

1. **Host Mismatch:** The server rejected the requests because the workspace was explicitly registered under the desktop's hostname (`DESKTOP-ABC123`).
2. **Conflicting Local Paths (Client Root):** The desktop project lives on the `D:/` drive, whereas the laptop project is located at `C:/projects/...`. Because of this discrepancy, the server's central database and the local file system fell completely out of sync, causing `p4 sync` to incorrectly report that files were already up-to-date (`up-to-date`) despite an empty local directory.
3. **System File Protection (`P4_SYSTEMIGNORE`):** A versioned file named `p4config.txt` existed on the server. The Windows/MINGW64 Perforce client flagged this as a protected system configuration file and aborted the entire synchronization process to protect local settings.

## 2. The Solution and Executed Commands

To fix this cleanly without breaking the desktop configuration, we created a **completely new, dedicated client profile** for the laptop and explicitly mapped out the problematic configuration file.

### Step 1: Local Configuration (`.p4config`)

Inside the laptop's project folder (`C:/projects/Unreal/MyProject`), the `.p4config` file was updated with a unique client name designated for this machine:

```text
P4PORT=p4-server.example.com:1666
P4USER=p4user
P4CLIENT=myproject-laptop
P4IGNORE=.p4ignore
```

### Step 2: Creating and Cloning the Workspace

Instead of configuring the stream mappings from scratch, we used the original workspace as a template (`-t` flag) to generate the new laptop profile on the server:

```bash
P4CONFIG=./.p4config p4 client -t myproject-desktop
```

* **Inside the text editor that opened:**
* The `Root:` line was changed to point to the laptop's actual path: `Root: C:\projects\Unreal\MyProject`
* The `Host:` field was left **completely blank** (`Host:`) so that future synchronization wouldn't freeze due to hostname checks.

### Step 3: Permanently Excluding `p4config.txt`

Since downloading `p4config.txt` from the server blocked the transfer via the `P4_SYSTEMIGNORE` error, we used the `p4 client` command to remove it from this workspace's mapping (`View:` section) using an exclusion rule (the minus `-` sign):

```text
View:
        //depot/MyProject/dev/... //myproject-laptop/...
        -//depot/MyProject/dev/p4config.txt //myproject-laptop/p4config.txt
```

### Step 4: Fresh Synchronization

Because `myproject-laptop` is recognized as a brand-new client with an empty history by the server, the standard sync command successfully pulled the entire project down to the C drive without further errors:

```bash
P4CONFIG=./.p4config p4 sync
```

## 3. Why Is the Directory Size Smaller on the Laptop?

After a successful sync, the project folder on the laptop measures around ~5.9 GB, while the desktop machine sits at ~8+ GB. **This is expected and correct.** Perforce only stores raw source assets. The missing ~2 GB consists of locally generated directories that are correctly ignored via `.p4ignore` and should never be submitted to the server:

* `Intermediate/` – Temporary C++ build files, engine configurations, and shader caches.
* `Saved/` – Local log files, autosaves, and user-specific editor layout configurations.
* `.vs/` – Visual Studio / Rider source code indexing database.
* `DerivedDataCache/` (DDC) – Compressed asset versions optimized for quick loading.

> **Note:** As soon as the project is opened in the Unreal Engine editor on the laptop for the first time and shaders complete compiling, these folders will automatically regenerate, and the directory size will match the desktop version.

## 4. Daily Workflow going forward

Since the file version history is bound directly to the shared **Stream** (`//depot/MyProject/dev`) and not the individual workspaces, both machines operate completely independently without interfering with each other:

* **Working on the Laptop:** Modifying files and submitting via `p4 submit` (or using the built-in Unreal Engine Source Control UI) safely pushes changes to the central server under the dev stream.
* **Switching to the Desktop:** Running a simple `p4 sync` in the original workspace on the desktop machine will instantly download all the modifications submitted from the laptop.
