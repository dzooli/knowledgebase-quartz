---
title: Development
description: Resources and guides for software development.
date: 2024-06-11
tags:
    - development
    - perforce
    - generic
    - tips
---

# Perforce

## Perforce CLI Cheatsheet

| Command                  | Description                                   |
|--------------------------|-----------------------------------------------|
| `p4 sync`                | Sync files in workspace to latest depot state |
| `p4 edit <file>`         | Open file for edit                            |
| `p4 add <file>`          | Add new file to depot                         |
| `p4 delete <file>`       | Mark file for deletion                        |
| `p4 revert <file>`       | Revert changes to file                        |
| `p4 submit`              | Submit open files to depot                    |
| `p4 status`              | Show opened and missing files                 |
| `p4 diff`                | Show diffs between workspace and depot        |
| `p4 info`                | Show client/server information                |
| `p4 set`                 | Display/set Perforce environment variables    |
| `p4 set > p4env.txt`     | Save current Perforce config to a file        |
| `p4 client`              | Create or edit workspace specification        |
| `p4 clients`             | List all workspaces                           |
| `p4 switch <stream>`     | Switch workspace to a different stream        |
| `p4 streams`             | List available streams                        |
| `p4 branch`              | Create or edit branch specification           |
| `p4 integrate`           | Integrate changes between branches/streams    |
| `p4 resolve`             | Resolve conflicts after integration           |

---

### Example `.p4config`

```txt
P4PORT=perforce:1666
P4USER=yourusername
P4CLIENT=yourworkspace
P4PASSWD=yourpassword
```

Place `.p4config` in your workspace directory and set the `P4CONFIG` environment variable to its filename.

---

### Displaying Current Perforce Configuration

To show your current Perforce environment settings:

```sh
p4 set
```

To save the current configuration to a file:

```sh
p4 set > p4env.txt
```

---

### Switching a Workspace

1. Edit your `p4config.txt` and change the `P4CLIENT` value to the desired workspace name.
2. Run `p4 sync` to update files for the new workspace.

---

### Creating a Streaming Repository and Branches

1. **Create a stream depot:**
    ```sh
    p4 depot -t stream my_stream_depot
    ```
2. **Create a mainline stream:**
    ```sh
    p4 stream -t mainline //my_stream_depot/main
    ```
3. **Create a workspace for the stream:**
    ```sh
    p4 client -S //my_stream_depot/main my_stream_workspace
    ```
4. **Create a development branch stream:**
    ```sh
    p4 stream -t development -P //my_stream_depot/main //my_stream_depot/dev
    ```
5. **Switch to a branch stream:**
    ```sh
    p4 switch //my_stream_depot/dev
    ```

## More topics

- [[perforce_client_setup|Perforce Client Setup]]