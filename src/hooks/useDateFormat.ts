import React from "react";

const useDateFormat = (postDate: number | undefined) => {
  // formating date
  if (postDate) {
    const d = new Date(postDate);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let month = months[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();

    return `${month} ${day} ${year}`;
  }
};

export default useDateFormat;
