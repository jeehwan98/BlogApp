"use client"

import { fetchFeedbackAPI } from "@/app/api/feedback"
import { Feedback } from "@/interfaces/feedback";
import { useCallback, useEffect, useState } from "react"
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function FeedbackInfo() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFeedback = useCallback(async () => {
    try {
      const fetchedFeedbacks = await fetchFeedbackAPI();
      setFeedbacks(fetchedFeedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  console.log("feedback?: ", feedbacks);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={feedbacks || []} />
    </div>
  )
}