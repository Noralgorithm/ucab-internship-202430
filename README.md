# UCAB Internship 202430

## Description

UCAB Shared Mobilization Project

## Prerequisites

> [!IMPORTANT]
> We encourage you to use the latest versions of the environments to ensure correct execution.

- Node -version 20+
- pnpm

## Installation

This project uses pnpm so we encourage you to do so.

```bash
pnpm install
```

## Development Server :)

Run `pnpm dev` for both devs servers either Client or Server, both applications will automatically reload if you change any of the source files.

- Client: Navigate to `http://localhost:4200/`
- Server: Navigate to `http://localhost:3000/`

## Build

> [!NOTE]
> This will not run anything, this just creates the outputs for production, if you want to run the proper application start a development server.

Run `pnpm build` for building both applications. The build artifacts will be stored in the following directories:

- apps
  - Client: `client/dist/`
  - Server: `server/dist/`
