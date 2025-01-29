# LoopBack 4 Monorepo with Lerna & npm Workspaces

This guide helps how to set up a **LoopBack 4** monorepo using **Lerna** and **npm workspaces**. It includes creating services and running them.

---

## 1. Creating a Monorepo using Lerna

Initialize a new monorepo:

```sh
mkdir lerna-demo && cd lerna-demo
npx lerna init
```

Update the root `package.json`:

```json
{
  "name": "root",
  "private": true,
  "workspaces": ["packages/*/*"],
  "dependencies": {},
  "devDependencies": {
    "lerna": "^8.1.9"
  }
}
```

---

## 2. Creating LoopBack 4 Services

```sh
cd packages
npx lb4 app facades/gateway-service
npx lb4 app services/user-service
npx lb4 app services/product-service
```

Install dependencies for all workspaces:

```sh
npm install
```

---

## 3. Starting the Whole Workspace Using npm Workspaces

### Run All Services in Parallel (Lerna Recommended)

```sh
lerna run start --parallel
```

✔ This starts all services simultaneously.

### Run a Specific Service

```sh
npm run start --workspace=gateway-service
```

✔ Runs only `gateway-service`.
