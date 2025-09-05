import React, { useEffect, useState } from "react";
import { deleteItem, getAnswer, getReports, postQuestion } from "@/Api/postApi";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [questions, setQuestions] = useState([""]);
  const [expandedRows, setExpandedRows] = useState({}); // track expanded rows
  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const response = await getReports();
      setReports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleView = (id) => {
    navigate(`/details/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      fetchReports();
    } catch (error) {
      console.log(error);
    }
  };

  const openVerifyModal = (report) => {
    setCurrentReport(report);
    setQuestions([""]);
    setModalOpen(true);
  };

  const handleAddQuestion = () => setQuestions([...questions, ""]);

  const handleRemoveQuestion = (index) =>
    setQuestions(questions.filter((_, i) => i !== index));

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const handleSubmitQuestions = async () => {
    if (!currentReport) return;
    const userId = currentReport.userId;
    try {
      await postQuestion(currentReport._id, userId, questions);
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  
  const toggleExpand = async (report) => {
    const isExpanded = expandedRows[report._id]?.expanded;

    if (isExpanded) {
      // collapse
      setExpandedRows((prev) => ({ ...prev, [report._id]: { expanded: false, data: [] } }));
    } else {
      try {
        const response = await getAnswer(report._id);
        setExpandedRows((prev) => ({
          ...prev,
          [report._id]: { expanded: true, data: response.data.data || [] },
        }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>Reported By</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <React.Fragment key={report._id}>
                <TableRow>
                  <TableCell>{report.itemDetails?.itemName || "N/A"}</TableCell>
                  <TableCell>{report.userName || "N/A"}</TableCell>
                  <TableCell>{report.message}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleView(report.itemId)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(report.itemId)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => openVerifyModal(report)}
                    >
                      Verify
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleExpand(report)}
                    >
                      {expandedRows[report._id]?.expanded ? "Hide QA" : "Show QA"}
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Expanded Row for Q&A */}
                {expandedRows[report._id]?.expanded && (
                  <TableRow className="bg-zinc-50">
                    <TableCell colSpan={4}>
                      <div className="p-3 space-y-2">
                        <h4 className="font-semibold">Questions & Answers</h4>
                        {expandedRows[report._id].data.length > 0 ? (
                          expandedRows[report._id].data.map((q) => (
                            <div
                              key={q._id}
                              className="border rounded-lg p-2 flex justify-between"
                            >
                              <span className="font-medium">{q.question}</span>
                              <span className="text-zinc-600">
                                {q.answer || "No answer yet"}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-zinc-500">No Q&A found.</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-zinc-500">
                No reports found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Verify Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Verify Report: {currentReport?.itemDetails?.itemName || ""}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2 mt-4">
            {questions.map((q, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder={`Question ${index + 1}`}
                  value={q}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveQuestion(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={handleAddQuestion}>
              Add Question
            </Button>
          </div>

          <DialogFooter>
            <Button onClick={handleSubmitQuestions}>Submit Questions</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportList;


