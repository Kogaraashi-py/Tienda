import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "_site",
  },
  media: {
    tina: {
      mediaRoot: "src/assets/images",
      publicFolder: "_site",
    },
  },
  schema: {
    collections: [
      {
        name: "products",
        label: "Productos",
        path: "src/products",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título",
            isTitle: true,
            required: true,
          },
          {
            type: "number",
            name: "price",
            label: "Precio",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Descripción",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Imagen",
          },
          {
            type: "boolean",
            name: "published",
            label: "Publicado",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Fecha",
            required: true,
          },
        ],
      },
    ],
  },
});
