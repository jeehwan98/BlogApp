import { NextRequest, NextResponse } from "next/server";
// import formidable from "formidable";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  // const form = new formidable.
}