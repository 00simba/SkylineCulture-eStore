import Counter from "../../../server/models/counter.js";

export async function getNextOrderNumber() {
  const counter = await Counter.findOneAndUpdate(
    { _id: "orderid" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
}
