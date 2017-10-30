const { events, Job } = require("brigadier")

const sendTo = "technosophos"

events.on("exec", (e, p) => {
  // Create a new job
  const twitter = new Job("tweet", "technosophos/twitter-t:latest")
  twitter.storage.enabled = false

  // Set up the environment variables, copying them from the project.
  twitter.env = {
    OWNER: p.secrets.OWNER,
    CONSUMER_KEY: p.secrets.CONSUMER_KEY,
    CONSUMER_SECRET: p.secrets.CONSUMER_SECRET,
    ACCESS_TOKEN: p.secrets.ACCESS_TOKEN,
    ACCESS_SECRET: p.secrets.ACCESS_SECRET
  }

  // Set up the env and send a DM
  twitter.tasks = [
    "env2creds",
    `t dm ${sendTo} "${p.name} got event ${e.type}"`
  ]

  twitter.run()
})
