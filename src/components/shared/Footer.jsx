import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br via-purple-50 to-indigo-50 text-gray-700 pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Logo & About */}
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-3">
            🎁 GiftShop
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 max-w-xs">
            Surprise your loved ones with personalized gifts. Quality, care, and
            fast delivery — all wrapped in love.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-700">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Shop", "About", "Contact"].map((item, i) => (
              <li key={i}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-pink-500 hover:pl-1 transition-all duration-300 ease-out"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-700">
            Support
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              Email:{" "}
              <span className="text-pink-500 hover:underline cursor-pointer transition-colors">
                support@giftshop.com
              </span>
            </li>
            <li>Phone: +880 1234 567 890</li>
            <li>Hours: 9am - 10pm (Everyday)</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-700">
            Stay Connected
          </h3>
          <div className="flex gap-4 mb-4">
            <SocialIcon
              href="#"
              icon={<Facebook size={20} />}
              color="text-blue-500"
            />
            <SocialIcon
              href="#"
              icon={<Instagram size={20} />}
              color="text-rose-500"
            />
            <SocialIcon
              href="#"
              icon={<Twitter size={20} />}
              color="text-sky-500"
            />
          </div>
          <p className="text-sm text-gray-600">
            Follow us for exclusive offers!
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-sm text-gray-500">
        <hr className="my-4 border-pink-200" />
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-pink-500 font-medium">GiftShop</span>. All rights
        reserved.
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon, color }) {
  return (
    <a
      href={href}
      className={`p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 ${color}`}
    >
      {icon}
    </a>
  );
}
