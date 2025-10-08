function About() {
  const features = [
    {
      title: "Transparency",
      img: "/src/assets/lll.jpg",
      desc: "Our website will provide transparency to the citizens in the working of the government. All the data and updates will be available in one place..",
    },
    {
      title: "Easy Access",
      img: "/src/assets/mmm.png",
      desc: "All services and information can be accessed anytime on mobile or desktop. No need to stand in queue.",
    },
    {
      title: "Citizen Empowerment",
      img: "/src/assets/vvv.jpg",
      desc: "People can directly contribute towards improving the society by giving their suggestions and feedback.",
    },
    {
      title: "Time Saving",
      img: "/src/assets/iii.webp",
      desc: "By making all important facilities available online, citizens will save time and get their work done faster.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white p-10"
      style={{ backgroundImage: "url('/src/assets/rrrr.jpg')" }} // ✅ bg image
    >
      {/* Dark + Blur Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500">
          About Us
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300 p-6 flex flex-col items-center text-center"
            >
              {/* Image */}
              <img
                src={feature.img}
                alt={feature.title}
                className="w-24 h-24 object-cover rounded-full mb-4 shadow-md border border-white/30"
              />

              {/* Title */}
              <h2 className="text-xl font-bold text-orange-400 mb-2">
                {feature.title}
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;



// function About() {
//   const features = [
//     {
//       title: "Transparency",
//       img: "/src/assets/lll.jpg",
//       desc: "Our website will provide transparency to the citizens in the working of the government. All the data and updates will be available in one place..",
//     },
//     {
//       title: "Easy Access",
//       img: "/src/assets/mmm.png",
//       desc: "All services and information can be accessed anytime on mobile or desktop. No need to stand in queue.",
//     },
//     {
//       title: "Citizen Empowerment",
//       img: "/src/assets/vvv.jpg",
//       desc: "People can directly contribute towards improving the society by giving their suggestions and feedback.",
//     },
//     {
//       title: "Time Saving",
//       img: "/src/assets/iii.webp",
//       desc: "By making all important facilities available online, citizens will save time and get their work done faster.",
//     },
//   ];

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center relative text-white p-10"
//       style={{ backgroundImage: "url('/src/assets/rrrr.jpg')" }}
//     >
//       {/* Dark + Blur Overlay */}
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

//       {/* Content */}
//       <div className="relative z-10">
//         {/* Heading */}
//         <h1 className="text-4xl md:text-5xl font-extrabold mt-30 text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500">
//           About Us
//         </h1>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xh mx-auto mt-40">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300 p-6 flex flex-col items-center text-center"
//             >
//               <img
//                 src={feature.img}
//                 alt={feature.title}
//                 className="w-24 h-24 object-cover rounded-full mb-4 shadow-md border border-white/30"
//               />

//               <h2 className="text-xl font-bold text-orange-400 mb-2">
//                 {feature.title}
//               </h2>

//               <p className="text-gray-300 text-sm leading-relaxed">
//                 {feature.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;
