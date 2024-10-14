import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Terms = ({ handleOverlay }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const modal = useRef<HTMLDivElement>(null);

  const formatDate = (date: any) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const toggleModal = () => setIsOpen(!isOpen);

  const handleOutsideClick = (e: MouseEvent) => {
    if (isOpen && modal.current && !modal.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
    console.log(e);
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      {/* TODO: change font */}
      <p className=" text-sm text-[#999999] max-w-[80%] mx-auto text-center mb-6">
        By registering, you agree to our{" "}
        <span
          className="text-main font-medium hover:cursor-pointer"
          onClick={toggleModal}
        >
          Terms and Conditions
        </span>{" "}
        and{" "}
        <span
          className="text-main font-medium hover:cursor-pointer"
          onClick={toggleModal}
        >
          Privacy Policy.
        </span>{" "}
        Please ensure you have read and understood them.
      </p>
      {isOpen && (
        <div className="fixed flex justify-center items-center h-screen w-full bg-slate-200/25 top-0 right-0">
          <div
            className="bg-white rounded-[8px] md:w-1/2 w-5/6 h-[95vh] border border-main p-4"
            ref={modal}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-main font-semibold text-xl md:text-2xl">
                Terms and Conditions
              </h1>
              <X
                onClick={toggleModal}
                className="text-main text-xl border border-main md:text-2xl cursor-pointer"
              />
            </div>
            <div className="md:h-[87vh] h-[85vh] overflow-x-scroll">
              <span className=" text-justify md:text-base text-sm leading-snug my-3">
                <div className="my-2">
                  <p>Product License Agreement</p>
                  <p className="font-semibold text-main">
                    The Pistis Tech Hub Mentorship Program
                  </p>
                  <h3 className="italic">
                    Effective Date: [{formatDate(new Date())}]
                  </h3>
                </div>
                <div>
                  <h2 className="text-main font-semibold">
                    IMPORTANT – READ CAREFULLY:
                  </h2>{" "}
                  <p>
                    This Product License Agreement (“Agreement”) is a legal
                    agreement between you (either an individual or an entity)
                    and The Pistis Tech Hub (“Company”) for the use of The
                    Pistis Tech Hub Mentorship Program and any associated media,
                    printed materials, and online or electronic documentation
                    (collectively, the “Product”).
                    <br />
                    By installing, copying, or otherwise using the Product, you
                    agree to be bound by the terms of this Agreement. If you do
                    not agree to the terms of this Agreement, do not install or
                    use the Product.
                  </p>
                </div>
                <div>
                  <h2 className="text-main font-semibold my-2">
                    LICENSE GRANT
                  </h2>
                  <p>
                    The Pistis Tech Hub grants you a limited, non-exclusive,
                    non-transferable, revocable license to use the Product
                    solely for your personal or internal business purposes,
                    subject to the terms and conditions of this Agreement.
                  </p>
                  <h2 className="text-main font-semibold my-2">
                    LICENSE RESTRICTIONS You may not:
                  </h2>
                  <p>
                    Modify, adapt, translate, reverse engineer, decompile,
                    disassemble, or create derivative works based on the
                    Product; Rent, lease, lend, sell, redistribute, or
                    sublicense the Product; Use the Product for any unlawful
                    purpose or in violation of any local, state, national, or
                    international law; Remove, alter, or obscure any proprietary
                    notices (including copyright and trademark notices) of The
                    Pistis Tech Hub or its licensors.
                  </p>{" "}
                  <h2 className="text-main font-semibold my-2">
                    INTELLECTUAL PROPERTY RIGHTS
                  </h2>{" "}
                  <p>
                    The Product and all intellectual property rights therein are
                    owned by The Pistis Tech Hub and its licensors. The Product
                    is protected by copyright and other intellectual property
                    laws and treaties. All rights not expressly granted herein
                    are reserved by The Pistis Tech Hub.
                  </p>{" "}
                  <h2 className="text-main font-semibold my-2">
                    TERM AND TERMINATION
                  </h2>{" "}
                  <p>
                    This Agreement is effective until terminated. Your rights
                    under this Agreement will terminate automatically without
                    notice from The Pistis Tech Hub if you fail to comply with
                    any term(s) of this Agreement. Upon termination, you must
                    cease all use of the Product and destroy all copies, full or
                    partial, of the Product.
                  </p>{" "}
                  <h2 className="text-main font-semibold my-2">
                    COMPETITOR SPYING
                  </h2>{" "}
                  <p>
                    If it is found that you are a spy or an agent from a
                    competitor attempting to gather information on the Product,
                    your access will be immediately blocked. Additionally, The
                    Pistis Tech Hub reserves the right to report your actions to
                    the appropriate authorities. Such actions are considered a
                    breach of this Agreement and may result in legal action.
                  </p>{" "}
                  <h2 className="text-main font-semibold my-2">
                    ENTIRE AGREEMENT
                  </h2>{" "}
                  <p>
                    This Agreement constitutes the entire agreement between you
                    and The Pistis Tech Hub with respect to the Product and
                    supersedes all prior or contemporaneous understandings and
                    agreements, whether written or oral, with respect to the
                    Product.
                  </p>{" "}
                  <h2 className="text-main font-semibold my-2">AMENDMENTS</h2>{" "}
                  <p>
                    The Pistis Tech Hub reserves the right to amend this
                    Agreement at any time by providing notice to you. Your
                    continued use of the Product after any such amendments shall
                    constitute your acceptance of the amended Agreement.{" "}
                  </p>
                  <h2 className="text-main font-semibold my-2">SEVERABILITY</h2>{" "}
                  <p>
                    If any provision of this Agreement is held to be invalid or
                    unenforceable, the remaining provisions of this Agreement
                    will remain in full force and effect.
                  </p>{" "}
                  <h2 className="text-main font-semibold my-2">
                    CONTACT INFORMATION
                  </h2>
                  <p>
                    If you have any questions about this Agreement, please
                    contact The Pistis Tech Hub at:
                  </p>
                </div>
                <div>
                  <h3>
                    Email:{" "}
                    <a
                      href="admin@pistis.solutions"
                      className="cursor-pointer text-main italic"
                      target="_blank"
                    >
                      admin@pistis.solutions
                    </a>{" "}
                  </h3>
                  <p className="font-semibold text-main py-4">
                    By clicking “I Agree” or installing or using the Product,
                    you acknowledge that you have read this Agreement,
                    understand it, and agree to be bound by its terms and
                    conditions.
                  </p>
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Terms;
