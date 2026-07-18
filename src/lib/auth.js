import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function signAdminToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}
