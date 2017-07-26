#!/usr/bin/env node

if (process.argv.length > 2) {
  if (process.argv[2].length < 10) {
    require('../build/main/index').run(process.argv[2]);
  }
} else {
  console.error('Missing task name')
}
