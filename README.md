# ds

Deno simple shell

## Usage

```typescript
import { $, $$, $e, $o, $s } from "https://deno.land/x/simple_shell/mod.ts";

const list = $("ls -l");
const data = list.split("\n").slice(1).map((l) => l.split(/\s+/).at(-1));
$$`file ${data[0]!}`;

import {} from "https://deno.land/x/simple_shell/src/mod_utils.ts";
if ("/etc/hosts".pathExists()) {
  $("cat /etc/hosts")
    .lines()
    .pipe(console.log);
}
```

Requires `--unstable` flag
