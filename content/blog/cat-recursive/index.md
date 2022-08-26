---
title: Cat file recursively
date: "2020-04-14T18:46:37.121Z"
description: Linux, xargs
---

```shell
$ find -type f -print0 | xargs -0 more | cat
```
