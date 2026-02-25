import React from "react";

function ProductDescription() {
  return (
    <div className="container grid md:grid-cols-2 lg:grid-cols-[70%_30%] gap-9 mt-13 items-center text-gray-700">
      <div>
        <div>
          <h5 className="text-2xl mb-5 font-semibold text-black">
            Description
          </h5>
        </div>
        <div className="space-y-3 ">
          <p>
            Go sporty this summer with this vintage navy and white striped
            v-neck t-shirt from the{" "}
            <span className="font-semibold">Abercrombie & Fitch</span>. Perfect
            for pairing with denim and white kicks for a stylish sporty vibe.
            Will fit a UK 8-10, model shown is a UK 8 and 5’5.
          </p>
          <p>
            Typography is the work of typesetters, compositors, typographers,
            graphic designers, art directors, manga artists, comic book artists,
            graffiti artists, and now—anyone who arranges words, letters,
            numbers, and symbols for publication, display, or distribution.
          </p>

          <p>
            Hit your next boxing workout with a combination it’s never seen
            before in the Combat Drop Arm Tank, including a freedom-instilling
            regular fit and dropped armhole to allow you to throw jabs and hooks
            at the punching bag with ease. A lightweight material keeps you
            fighting fit and fresh.
          </p>

          <p>
            Go sporty this summer with this vintage navy and white striped
            v-neck t-shirt from{" "}
            <span className="font-semibold">Abercrombie & Fitch</span>. Perfect
            for pairing with denim and white kicks for a stylish sporty vibe.
          </p>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-bold mb-3">Nutrition Facts</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Calories</span>
            <span>70</span>
          </div>
          <div className="flex justify-between">
            <span>Total Fat</span>
            <span>5g (6%)</span>
          </div>
          <div className="flex justify-between">
            <span>Cholesterol</span>
            <span>185mg (62%)</span>
          </div>
          <div className="flex justify-between">
            <span>Sodium</span>
            <span>70mg (49%)</span>
          </div>
          <div className="flex justify-between">
            <span>Total Carbohydrate</span>
            <span>0g (18%)</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Protein</span>
            <span>6g (35%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
