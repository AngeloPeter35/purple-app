import React from "react";

const ExportPanel = () => {
  const handleExport = () => {
    const bookings = JSON.parse(localStorage.getItem("bookings_list")) || [];

    const csv =
      "KRA,Start,End,Items,Date\n" +
      bookings
        .map((b) =>
          [
            b.kra,
            b.start,
            b.end,
            `"${b.items.map((i) => i.name).join(" | ")}"`,
            b.date,
          ].join(",")
        )
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h3>Export Reports</h3>
      <p>Download all bookings as a CSV file:</p>
      <button onClick={handleExport}>Download CSV</button>
    </div>
  );
};

export default ExportPanel;
