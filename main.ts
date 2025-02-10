import { spawn } from "node:child_process";

let child = spawn("deno childproc.ts", {
  shell: true,
});

let close = new Promise<{ code: number | null; signal: NodeJS.Signals | null }>(
  (resolve) => child.on("close", (code, signal) => resolve({ code, signal })),
);

await new Promise((resolve) => child.on("spawn", resolve));

console.log("child process spawned");

await new Promise((resolve) => setTimeout(resolve, 1000));

console.log("killing");

child.kill();

let timeout = new Promise<string>((resolve) =>
  setTimeout(() => resolve("timeout"), 1000)
);

let result = await Promise.race([close, timeout]);

if (typeof result === "string") {
  console.log(
    "fail: tried to send a kill to child process and await close event, but it did not happen",
  );
  process.exit(1);
} else {
  console.log("success");
  process.exit(0);
}
