export const useJoinASLecturerOptions = async function () {
  const { getActiveFieldsOfTraining } = useFieldOfTraining();
  const { getActiveJobTitle } = useJobTitle();
  const { getCountries } = useCountries();

  const { data: countries } = await getCountries();
  const { data: jobTitles } = await getActiveJobTitle();
  const { data: fieldsOfTraining } = await getActiveFieldsOfTraining();

  const formattedCountries = countries?.map(
    (country: { localeName: string; isoCode: string }) => ({
      label: country?.localeName,
      value: country?.isoCode,
    })
  );

  const formattedJobTitle = jobTitles?.items?.map(
    (jobTitle: { id: string; localizedName: string }) => ({
      label: jobTitle?.localizedName,
      value: jobTitle.id,
    })
  );

  const formattedFieldsOfTraining = fieldsOfTraining?.items?.map(
    (jobTitle: { id: string; localizedName: string }) => ({
      label: jobTitle?.localizedName,
      value: jobTitle.id,
    })
  );

  return { formattedCountries, formattedJobTitle, formattedFieldsOfTraining };
};
