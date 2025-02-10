// this is a process that will exit when it receives SIGINT
const interval = setTimeout(() => {}, Math.pow(2, 30));

Deno.addSignalListener("SIGINT", () => {
  console.log("done");
  clearInterval(interval);
});

console.log("running");
