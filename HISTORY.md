# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial `Medication Tracker.html` and `index.html` standalone iOS-optimized web app for tracking scheduled doses, Medrol dose pack days, and as-needed (PRN) medications.
- Offline Progressive Web App support via `manifest.json`, `sw.js` Service Worker, and custom home screen icons (`icon-180.png`, `icon-192.png`, `icon-512.png`).
- Shareable iPhone launcher files (`Install Med Tracker Home Screen Icon.mobileconfig`, `Open Medication Tracker.webloc`, `Open Medication Tracker.url`, and `Medication Tracker QR Code.png`).
- `chat_summary.html` documenting the iPhone web app troubleshooting and deployment workflow.

### Changed
- Enhanced `Medication Tracker.html` with automatic local file preview detection to break out of iOS Quick Look into Safari and preserve `localStorage` state.
- Updated `sw.js` Service Worker to ignore non-200 responses, ensuring the installed iPhone Home Screen app continues working offline even after the GitHub repository is made private.
- Removed dosage mass (mg) from medication titles and added short purpose labels next to each medication name in `index.html` and `Medication Tracker.html`.

