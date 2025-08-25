"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app/app");
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = (0, app_1.createApp)();
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map