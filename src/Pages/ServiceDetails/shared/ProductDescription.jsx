// import React from "react";

// const ProductDescription = ({ text }) => {
//   const paragraphs = text.split("\n\n");

//   const mid = Math.ceil(paragraphs.length / 2);
//   const left = paragraphs.slice(0, mid);
//   const right = paragraphs.slice(mid);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//       {/* LEFT */}
//       <div className="prose prose-sm text-text-muted leading-relaxed">
//         {left.map((p, i) => (
//           <p
//             key={i}
//             className={
//               i === 0
//                 ? "mb-4 first-letter:text-4xl first-letter:font-display first-letter:text-primary first-letter:mr-2 first-letter:float-left"
//                 : "mb-4"
//             }
//           >
//             {p}
//           </p>
//         ))}
//       </div>

//       {/* RIGHT */}
//       <div className="prose prose-sm text-text-muted leading-relaxed">
//         {right.map((p, i) => (
//           <p key={i} className="mb-4">
//             {p}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default ProductDescription;
<div className="text-gray-800 dark:text-gray-200">
  {" "}
  {text.split("\n\n").map((block, index) => (
    <div key={index} className="mb-4">
      {" "}
      {block.includes("-") ? (
        <ul className="list-disc list-inside">
          {" "}
          {block.split("\n").map((line, i) => (
            <li key={i}>{line.replace("-", "").trim()}</li>
          ))}{" "}
        </ul>
      ) : (
        <p>{block}</p>
      )}{" "}
    </div>
  ))}{" "}
</div>;
