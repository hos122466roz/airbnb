import getCurrentUser from "./actions/getCurrentUser";
import getListing, { ilistingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
interface HomeProps {
  searchParams: ilistingParams;
}
const Home = async ({searchParams}:HomeProps) => {
  const listrings = await getListing(searchParams);
  const currentUser = await getCurrentUser();
  if (listrings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div
          className="
    pt-24 
    grid 
    gird-cols-1 
    ms:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4 
    xl:grid-cols-5 
    2xl:grid-cols-6
    gap-8"
        >
          {listrings.map((listring) => {
            return (
              <ListingCard
                key={listring.id}
                data={listring}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};
export default Home;