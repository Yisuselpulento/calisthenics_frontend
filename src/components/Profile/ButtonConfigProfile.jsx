import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import ConfirmUnfollowModal from "../Modals/ConfirmUnfollowModal";
import {userReportReasons}  from "../../helpers/reportsOptions.js";
import ReportModal from "../Modals/ReportModal.jsx";

const ButtonConfigProfile = ({ isFollowing, onUnfollowConfirmed, onReportSend, loadingReport }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showUnfollowModal, setShowUnfollowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleUnfollowClick = () => {
    setShowUnfollowModal(true);
    setOpenMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="rounded-full hover:bg-stone-800 transition"
      >
        <FaEllipsisV className="text-lg" />
      </button>

      {openMenu && (
        <div className="absolute left-0 mt-2 w-44 bg-stone-900 border border-stone-700 rounded-lg shadow-lg p-2 z-50">
          {isFollowing && (
            <button
              onClick={handleUnfollowClick}
              className="w-full text-left px-3 py-2 rounded hover:bg-stone-800"
            >
              Dejar de seguir
            </button>
          )}

          <button
            onClick={() => {
              setShowReportModal(true);
              setOpenMenu(false);
            }}
            className="w-full text-left px-3 py-2 rounded hover:bg-stone-800 mt-1"
          >
            Reportar usuario
          </button>
        </div>
      )}

      <ConfirmUnfollowModal
        isOpen={showUnfollowModal}
        onCancel={() => setShowUnfollowModal(false)}
        onConfirm={() => {
          onUnfollowConfirmed(); // disparará toggleFollow
          setShowUnfollowModal(false);
        }}
      />

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSend={async (reason) => {
          await onReportSend(reason);
          setShowReportModal(false);
        }}
        loading={loadingReport}
        reasons={userReportReasons}
      />
    </div>
  );
};

export default ButtonConfigProfile;
