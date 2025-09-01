import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
export function MovieCard({poster_path, original_title, vote_average}) {
  return (
    <Card className="w-90">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="movie-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {original_title}
          </Typography>
          {/* <Typography color="blue-gray" className="font-medium">
            $95.00
          </Typography> */}
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {vote_average}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Show info
        </Button>
      </CardFooter>
    </Card>
  );
}