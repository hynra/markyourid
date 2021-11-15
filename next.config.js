/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  presets: ["next/babel"],
  env: {
    camanRaw: require('fs').readFileSync('./static/caman.min.js').toString()
  }
}
