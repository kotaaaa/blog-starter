---
title: Cat file recursively
date: "2020-11-14T18:46:37.121Z"
description: Can file recursively
---

```
$ find -type f -print0 | xargs -0 more | cat
```
