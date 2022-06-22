# ds

Deno simple shell

## Usage

```ts
import { $, $$, $e, $o, $s } from "https://deno.land/x/simple_shell/mod.ts";

const list = $("ls -l");
const data = list.split("\n").slice(1).map((l) => l.split(/\s+/).at(-1));
$$`file ${data[0]!}`;

import {} from "https://deno.land/x/simple_shell/src/stringUtils.ts";
if ("/etc/hosts".pathExists()) {
  console.log($("cat /etc/hosts").lines());
}
```

Requires `--unstable` flag
