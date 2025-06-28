
export const DashboardFooter = () => {
  return (
    <footer className="px-6 py-6">
      <div className="text-white bg-gradient-to-l from-blue-500/60 to-gray-600/60 p-4 rounded-lg">
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-2xl m-0">Product by Ayan Singh</h2>
          <div className="pl-7 flex items-center justify-center gap-3">
            <a href="https://www.linkedin.com/in/ayan-singh-a16a06280" className="text-white">
              <img src="/LinkedIn.png" alt="LinkedIn" className="h-6 w-6" />
            </a>
            <a href="https://github.com/nAYANko" className="text-white">
              <img src="/GitHub.png" alt="GitHub" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
