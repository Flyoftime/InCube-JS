import React from "react";

export default function CardSideBar() {
  return (
    <>
      <div
        className="card mx-1 mt-[100px] shadow-xl bg-base"
        style={{
          backgroundImage: "url('/assets/Group_26953.png')",
        }}
      >
        <div className="card-body">
          <h2 className="card-title -mb-2 text-base">Need Help?</h2>
          <p className="card-text text-sm">Please check our docs</p>
          <div className="card-actions justify-end bg-white rounded-lg p-3">
            <a
              href="/docs"
              className="text-black mx-auto font-semibold text-sm"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
