
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Menu, 
  X, 
  Home, 
  Film, 
  Heart, 
  Clock, 
  User, 
  LogIn
} from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen || searchOpen
          ? 'bg-background shadow-md'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-movie-primary font-bold text-2xl">Movie<span className="text-white dark:text-white">Hub</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-movie-primary transition-colors">
              Home
            </Link>
            <Link to="/movies" className="text-sm font-medium hover:text-movie-primary transition-colors">
              Movies
            </Link>
            <Link to="/genres" className="text-sm font-medium hover:text-movie-primary transition-colors">
              Genres
            </Link>
            <Link to="/favorites" className="text-sm font-medium hover:text-movie-primary transition-colors">
              My List
            </Link>
          </div>

          {/* Desktop Right Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {searchOpen ? (
              <form action="/search" method="get" className="relative">
                <Input
                  type="search"
                  name="q"
                  placeholder="Search for movies..."
                  className="w-64 bg-muted focus:bg-background"
                  autoFocus
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full"
                  onClick={toggleSearch}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <>
                <Button size="icon" variant="ghost" onClick={toggleSearch}>
                  <Search className="h-5 w-5" />
                </Button>
                <ThemeToggle />
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button size="sm">
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <Button size="icon" variant="ghost" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Button size="icon" variant="ghost" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Search */}
        {searchOpen && isMobile && (
          <div className="px-4 py-3 border-t border-border">
            <form action="/search" method="get" className="relative">
              <Input
                type="search"
                name="q"
                placeholder="Search for movies..."
                className="w-full bg-muted focus:bg-background"
                autoFocus
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full"
                onClick={toggleSearch}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border animate-fade">
            <div className="flex flex-col space-y-3 py-4 px-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-movie-hover-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5" /> 
                <span>Home</span>
              </Link>
              <Link 
                to="/movies" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-movie-hover-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Film className="h-5 w-5" /> 
                <span>Movies</span>
              </Link>
              <Link 
                to="/genres" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-movie-hover-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Film className="h-5 w-5" /> 
                <span>Genres</span>
              </Link>
              <Link 
                to="/favorites" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-movie-hover-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="h-5 w-5" /> 
                <span>My List</span>
              </Link>
              <Link 
                to="/history" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-movie-hover-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Clock className="h-5 w-5" /> 
                <span>Watch History</span>
              </Link>
              <div className="border-t border-border my-2"></div>
              <Link 
                to="/login" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-movie-hover-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-5 w-5" /> 
                <span>Sign In</span>
              </Link>
              <Link 
                to="/register" 
                className="flex items-center justify-center p-2 bg-movie-primary text-white rounded-md hover:bg-movie-primary/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Sign Up</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
