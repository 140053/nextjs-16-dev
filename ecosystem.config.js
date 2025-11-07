module.exports = {
  apps: [
    {
      name: "nextjs16",
      script: "pnpm",
      args: "start",
      cwd: "~/app/nextjs16-app",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
