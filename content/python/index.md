---
title: Python
tags:
  - knowledge
  - awesome
---
# Python

## Awesome packages

### Generic

- uv (the best dependency manager)
- orjson
- Pydantic V2
- msgpack
- httpx
- structlog
- pyinstaller

### AI/ML

- scikit-learn
- numpy
- polars

### Testing

- pytest
- assertpy

### FastAPI

- Piccolo
- python-socketio
- PropelAuth (best auth package)

### CLI

- rich
- typer

## py2exe

To ```setup.py```:

```python
from distutils.core import setup
import py2exe

setup(console=['myprogram.py'])
# run setup.py by 'python setup.py py2exe'
```

## Jupyter

### BeakerX

```bash
docker run -p 8888:8888 beakerx/beakerx
```
