import React from "https://esm.sh/react@18.2.0";
import { renderToString } from "https://esm.sh/react-dom@18.2.0/server";
import { ServerRequest } from "https://deno.land/x/servest@v1.3.4/server.ts";

import Colores from "../dao/Colores.ts";
import Form from '../components/Form.tsx';

const colores = Colores.getInstance();

const handlePost = async (req: ServerRequest) => {
  const body = await req.formData();
  const color = body.value("color")  ?? "";

  colores.addColor(color);
};

const handleRoot = async (req: ServerRequest) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=utf-8",
    }),
    body: renderToString(<Form />),
  });
};

export {
  handlePost,
  handleRoot,
};
