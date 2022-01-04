export const mapToUnixDate = (date: string) => {
  if (!date) {
    return 0;
  }

  const [year = 0, month = 1, day = 1] = date.split('-').map(Number);

  return new Date(year, month, day).getTime();
};

export const filterCompetitions = (season, competitions) => competitions.filter((competition) => {
  const startDate = mapToUnixDate(competition.currentSeason?.startDate);
  const endDate = mapToUnixDate(competition.currentSeason?.endDate);
  const search = mapToUnixDate(season);

  return search > startDate && search < endDate;
});
