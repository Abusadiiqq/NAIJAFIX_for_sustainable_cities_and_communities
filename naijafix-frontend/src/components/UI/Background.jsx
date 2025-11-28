const Background = () => {
  // Use a professional Unsplash image URL instead of local file
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80';

  return (
    <>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${backgroundImageUrl}")`,
          backgroundAttachment: 'fixed',
        }}
        aria-hidden="true"
      />
      {/* Subtle overlay for better text readability */}
      <div className="fixed inset-0 -z-9 bg-gradient-to-b from-black/20 via-black/10 to-black/20 pointer-events-none" />
    </>
  );
};

export default Background;