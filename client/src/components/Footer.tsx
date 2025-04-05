export default function Footer() {
    return (
      <footer className="dark:bg-gray-900 bg-white dark:text-white py-4 mt-16" style={{ boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)' }}>
        <div className="container mx-auto text-center"> 
          <p className="text-lg">&copy; {new Date().getFullYear()} MyTimeTable | All Rights Reserved | Developed by <a className="underline" href="https://shahzadali.vercel.app/" target="_blank" rel="noopener noreferrer">Shahzad Ali</a></p>
        </div>
      </footer>
    );
  }
  