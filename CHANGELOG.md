# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
_No unreleased changes_

## [1.3.0] - 2023-10-21
### Changed
- Updated discordjs to 14
- Changed commands to slash commands
- Changed cooldown to use built in method
- **Breaking change: Changed botSettings.json**

## [1.2.1] - 2021-09-18
### Removed
- Removed Intents.FLAGS.GUILD_PRESENCES

## [1.2.0] - 2021-09-18
### Added
- Added handling mentions as commands

### Changed
- Changed commands to work with discord.js 13

## [1.1.0] - 2021-09-01
### Added
- Added per guild setting files 
- Added command to add/remove channels the bot will reply in 
- Added changelog, readme and license

### Changed 
- Changed loading images to single function 
- Changed activity text to load from bot settings
- Changed reload images command to bot owner only 
- Changed image commands to only run when enabled
- Changed command processing function to work with spaces
- Updated discord.js to 12.5.3 

## [1.0.0] - 2020-04-18
### Initial Release

[1.3.0]: https://github.com/VariXx/frogbot/tree/v1.3.0
[1.2.1]: https://github.com/VariXx/frogbot/tree/v1.2.1
[1.2.0]: https://github.com/VariXx/frogbot/tree/v1.2.0
[1.1.0]: https://github.com/VariXx/frogbot/tree/v1.1.0
[1.0.0]: https://github.com/VariXx/frogbot/tree/v1.0.0
[Unreleased]: https://github.com/VariXx/frogbot/compare/master...develop