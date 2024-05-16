# Common Backend Types, Abstractions & Utils 🌉☁️

Package for common types, abstractions and utilities for gsharim backend.

## Installation

Run the following command:

```bash
npm install @eco8200/backend-common
```

## Development

For each update of the codebase, you should open a new branch containing one of the following prefixes:

```
- major-*
- minor-*
- patch-*
```

This is critical for our CI/CD automations.
Choose the prefix that best fits your changes:

-   major - for big updates (changes to method signatures, breaking changes to types & abstractions)
-   minor - for small updates (new type/abstraction/utility)
-   patch - for bugfixes (typos, mismatched types and bugfixes for utilities)

All the branches should be checked out from dev **only**!
After merging to dev, the automation will automatically create a PR to the master branch.
Only after this PR is merged the package would be published in it's stable form.
