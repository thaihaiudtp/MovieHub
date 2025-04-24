import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  LogIn,
  UserPlus,
  LogOut,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from '@/components/theme/ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check for user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
    navigate('/');
  };

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
          <Link to="/" className="flex items-center">
            <span className="text-movie-primary font-bold text-2xl">Movie<span className="text-white dark:text-white">Hub</span></span>
          </Link>

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
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuItem className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>{user.name || user.email}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/signin')}>
                      Sign In
                    </Button>
                    <Button size="sm" onClick={() => navigate('/signup')}>
                      Sign Up
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

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
              {user ? (
                <>
                  <div className="flex items-center space-x-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user.name || user.email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="flex items-center justify-start space-x-2 w-full text-red-600 hover:text-red-600"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/signin" 
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-movie-hover-dark"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5" /> 
                    <span>Sign In</span>
                  </Link>
                  <Link 
                    to="/signup" 
                    className="flex items-center justify-center p-2 bg-movie-primary text-white rounded-md hover:bg-movie-primary/90"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
