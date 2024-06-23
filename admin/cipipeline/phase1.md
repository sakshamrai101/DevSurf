

# Phase 1 - CI/CD Pipeline Overview

## Current Pipeline Operations

The CI/CD pipeline for the WebDev Journal project is designed to streamline and automate three key aspects of the development process: code formatting, unit testing, and documentation generation. Below is an outline of the pipeline operations based on the configurations and files within the repository.

### Code Formatting

**Configuration**: `.prettierrc`
- **Tools Used**: Prettier
- **Commands**: `npx prettier --check "**/*.{html,css,js}"`
- **Purpose**: Ensures all HTML, CSS, and JavaScript files adhere to defined coding standards, such as no semicolons, single quotes, and a maximum line width of 80 characters.

### Unit Testing

**Configuration**: `jest.config.js`
- **Tools Used**: Jest
- **Commands**: `npx jest`
- **Purpose**: Executes unit tests located in `tests` directories with file patterns like `*.spec.js` or `*.test.js`, ensuring that all functional aspects of the application behave as expected.

### Documentation Generation

**Configuration**: `jsdoc.json`
- **Tools Used**: JSDoc
- **Commands**: `npx jsdoc -c jsdoc.json`
- **Details**:
  - **Source**: Includes files from `source/script`.
  - **Excludes**: `node_modules` to prevent processing external dependencies.
  - **Output**: Documentation is generated to the `./docs/` directory.
  - **Features**: Uses markdown plugins, supports clever and monospace links, and includes the `README.md` as the main page of the documentation site.

## Associated Files and Details

- **`package.json`**: Manages project dependencies and scripts for running formatting, testing, and documentation commands.
- **`jsdoc.json`**: Configures paths, plugins, and output settings for JSDoc.
- **`jest.config.js`**: Specifies the environment and patterns for locating and executing tests.
- **`.prettierrc`**: Defines formatting rules for Prettier.

## Conclusion

The CI/CD pipeline is configured to automatically perform code checks on push or pull requests to the `main` branch. This ensures that the codebase remains clean, well-documented, and thoroughly tested at all stages of development. Future phases will enhance these setups as the project evolves.
