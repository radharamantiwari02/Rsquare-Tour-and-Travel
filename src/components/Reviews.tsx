import React, { useState } from 'react';
import { Review } from '../types/tour';

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id'>) => void;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, onAddReview }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newType, setNewType] = useState('Solo Traveler');
  const [newRating, setNewRating] = useState(5);
  const [newTag, setNewTag] = useState('Unforgettable Journey');
  const [newContent, setNewContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newContent) return;

    const initials = newAuthor
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'TR';

    onAddReview({
      author: newAuthor,
      avatarInitials: initials,
      avatarBg: 'bg-[#005a71] text-white',
      date: 'Traveled Just Now',
      travelerType: newType,
      tag: newTag,
      rating: newRating,
      content: `"${newContent}"`,
    });

    setNewAuthor('');
    setNewContent('');
    setShowReviewModal(false);
  };

  return (
    <section className="bg-white p-5 md:p-6 rounded-2xl shadow-xs border border-black/[0.04] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-headline-lg text-xl md:text-2xl font-bold text-[#131b2e]">
            Traveler Reviews &amp; Photos
          </h2>
          <p className="font-body-sm text-xs md:text-sm text-[#6f787d] mt-0.5">
            Real experiences from travelers who completed this odyssey
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-headline-lg text-2xl md:text-3xl font-bold text-[#131b2e]">
              4.98
            </span>
            <div>
              <div className="flex text-[#fea619]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="font-label-sm text-[11px] text-[#6f787d]">
                {reviews.length + 322} Verified Guests
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-3 py-1.5 rounded-lg border border-[#005a71] text-[#005a71] hover:bg-[#f2f3ff] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">rate_review</span>
            <span>Write Review</span>
          </button>
        </div>
      </div>

      {/* Review Cards list */}
      <div className="space-y-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 md:p-5 rounded-xl bg-[#f2f3ff] space-y-2 border border-black/[0.02]"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full font-headline-sm text-sm flex items-center justify-center font-bold shrink-0 ${rev.avatarBg}`}
                >
                  {rev.avatarInitials}
                </div>
                <div>
                  <h5 className="font-label-md text-sm font-bold text-[#131b2e]">
                    {rev.author}
                  </h5>
                  <p className="font-body-sm text-xs text-[#6f787d]">
                    {rev.date} • {rev.travelerType}
                  </p>
                </div>
              </div>
              <span className="font-label-sm text-xs text-[#005a71] bg-[#b9eaff]/50 px-2.5 py-0.5 rounded font-semibold whitespace-nowrap">
                {rev.tag}
              </span>
            </div>
            <p className="font-body-md text-xs md:text-sm text-[#3f484c] leading-relaxed italic">
              {rev.content}
            </p>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-black/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-[#131b2e]">Share Your Experience</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-[#6f787d] hover:text-black"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Katherine & James Lee"
                  className="w-full h-10 px-3 rounded-lg border border-black/15 text-sm focus:border-[#005a71] focus:ring-1 focus:ring-[#005a71] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">Traveler Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full h-10 px-2 rounded-lg border border-black/15 text-xs text-[#131b2e] focus:border-[#005a71] outline-none"
                  >
                    <option>Couple Tour</option>
                    <option>Solo Traveler</option>
                    <option>Family Expedition</option>
                    <option>Friends Getaway</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">Rating</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full h-10 px-2 rounded-lg border border-black/15 text-xs text-[#131b2e] focus:border-[#005a71] outline-none"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">Headline Tag</label>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="e.g. Pure Mountain Magic"
                  className="w-full h-10 px-3 rounded-lg border border-black/15 text-sm focus:border-[#005a71] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">Your Feedback</label>
                <textarea
                  rows={3}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Tell future wanderers about the train, dining, and scenic highlights..."
                  className="w-full p-3 rounded-lg border border-black/15 text-xs focus:border-[#005a71] outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#6f787d] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#005a71] hover:bg-[#0e7490] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Publish Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
