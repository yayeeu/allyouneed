
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AIYouneed</h3>
            <p className="text-gray-600 text-sm">
              Connecting SMEs with the AI tools they need to grow their business.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">For SMEs</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/browse" className="text-gray-600 hover:text-aiYouNeed-600">Browse AI Tools</Link></li>
              <li><Link to="/signup" className="text-gray-600 hover:text-aiYouNeed-600">Get Recommendations</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">For Startups</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/signup" className="text-gray-600 hover:text-aiYouNeed-600">Claim Your Profile</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-aiYouNeed-600">Promote Your Tool</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-aiYouNeed-600">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-aiYouNeed-600">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-aiYouNeed-600">Terms</a></li>
              <li><a href="#" className="text-gray-600 hover:text-aiYouNeed-600">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AIYouneed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
