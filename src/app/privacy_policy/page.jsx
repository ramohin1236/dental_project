import BreadCrumb from "@/components/shared/BreadCrumb";
import React from "react";
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#171717] text-white py-5">
      <div className="container mx-auto flex justify-start items-center">
        <BreadCrumb name="Home" title="Privacy Policy" />
      </div>
      <div className="container mx-auto p-5 shadow-lg rounded-lg bg-[#1c1c1c]">
        <section className="px-6 py-12 text-slate-700 leading-relaxed">
          <h1 className="text-2xl font-bold mb-5 text-white">Privacy Policy</h1>

          {[
            `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,

            `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,

            `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum.`,
          ].map((para, idx) => (
            <p key={idx} className="mb-5 text-[#9F9C96]">
              {para}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
}