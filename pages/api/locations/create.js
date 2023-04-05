import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/pages/api/lib/prisma";

export default async function (req, res) {
  res.json({
    status: "saved",
  });
}
