---
title: Python
---
# Python

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
