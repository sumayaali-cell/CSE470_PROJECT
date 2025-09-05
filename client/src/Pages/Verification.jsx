import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/Context/UserContext";
import { getQestion, postAnswer } from "@/Api/postApi";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Verification = () => {
  const { userId } = useContext(UserContext);
  const [data, setData] = useState([]); // array of reports/items
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [answers, setAnswers] = useState({}); // {questionId: answer}

  // Fetch all questions assigned to user
  const fetchQestions = async () => {
    try {
      const response = await getQestion(userId);
      // response.data.data contains the array
      setData(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQestions();
  }, [userId]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);

    // Initialize answers state for that report
    if (expandedIndex !== index && data[index]) {
      const newAnswers = {};
      data[index].questions.forEach((q) => {
        newAnswers[q._id] = q.answer || "";
      });
      setAnswers(newAnswers);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleUpload = async (reportId) => {
    const payload = Object.entries(answers).map(([id, answer]) => ({
      questionId: id,
      answer,
    }));

    try {
      console.log(payload)
      await postAnswer(reportId, { answers: payload });
      alert("Answers submitted successfully!");
      fetchQestions(); // refresh data
      setExpandedIndex(null);
    } catch (error) {
      console.error(error);
      alert("Failed to submit answers");
    }
  };

  return (
    <div className="p-6 space-y-4 h-screen" >
      {data.length === 0 && <p className="text-white">No items assigned for verification.</p>}

      {data.map((item, index) => (
        <Card key={item._id} className="bg-zinc-900 text-white">
          <CardHeader className="flex justify-between items-center">
            <span className="text-lg font-bold">{item.itemName}</span>
            <Button size="sm" onClick={() => toggleExpand(index)}>
              {expandedIndex === index ? "Collapse" : "Expand"}
            </Button>
          </CardHeader>

          {expandedIndex === index && (
            <CardContent className="space-y-3">
              <img
                src={`http://localhost:8000/${item.imageUrl}`}
                alt={item.itemName}
                className="w-32 h-32 object-cover rounded border border-zinc-700"
              />

              {item.questions.map((q, i) => (
                <div key={q._id} className="flex flex-col">
                  <label className="font-semibold mb-1">
                    Question {i + 1}: {q.question}
                  </label>
                  <Input
                    value={answers[q._id]}
                    onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                    placeholder="Type your answer..."
                    className='text-black'
                  />
                </div>
              ))}

              <Button onClick={() => handleUpload(item.reportId)} className="mt-2">
                Submit Answers
              </Button>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default Verification;
