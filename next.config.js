/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  presets: ["next/babel"],
  env: {
    camanRaw: require('fs').readFileSync('./static/caman.min.js').toString(),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "6Lf9w74dAAAAAOsm257jC1TeT3zWu-R6TY_cmO1F",
    RECAPTCHA_SECRET_KEY: "6Lf9w74dAAAAAJsHl0lBJSzYsdm-J7CN7kqx6gjC",
  }
}
