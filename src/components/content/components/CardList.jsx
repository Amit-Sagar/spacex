import React, { useState } from "react";
import { Table, Loader } from "semantic-ui-react";
import Paginate from "../../common/Paginator";
import { getStatusLabel, getFormattedDate } from "../../../utils/index";
import DetailModal from "../../common/DetailModal";

function CardList({
  isLoading,
  launches,
  activePage,
  setActivePage,
  launchCount,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [launch, setLaunch] = useState({});
  const handleClose = () => setModalIsOpen(false);

  const handleEvents = (launch) => {
    setModalIsOpen(true);
    setLaunch(launch);
  };

  return (
    <>
      {modalIsOpen ? (
        <DetailModal
          modalStatus={modalIsOpen}
          handleClose={handleClose}
          launch={launch}
        />
      ) : (
        ""
      )}
      {!isLoading ? (
        <>
          <div className="table-container border-2 border-black py-4 px-2 rounded-lg">
            {launches.length ? (
              <Table celled color="black" textAlign="center">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell className="w-[130px]">
                      Flight No.
                    </Table.HeaderCell>
                    <Table.HeaderCell className="w-[20%]">
                      Mission
                    </Table.HeaderCell>
                    <Table.HeaderCell className="w-[150px]">
                      Orbit
                    </Table.HeaderCell>
                    <Table.HeaderCell className="w-[150px]">
                      Rocket
                    </Table.HeaderCell>
                    <Table.HeaderCell className="w-[30%]">
                      lauched (UTC)
                    </Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {launches.map((launch) => {
                    return (
                      <Table.Row
                        key={launch.flight_number}
                        onClick={() => handleEvents(launch)}
                        className="text-center "
                      >
                        <Table.Cell>{launch.flight_number}</Table.Cell>
                        <Table.Cell>{launch.mission_name}</Table.Cell>
                        <Table.Cell>
                          {launch.rocket.second_stage.payloads[0].orbit}
                        </Table.Cell>
                        <Table.Cell>{launch.rocket.rocket_name}</Table.Cell>

                        <Table.Cell>
                          {getFormattedDate(launch.launch_date_utc)}
                        </Table.Cell>
                        <Table.Cell>
                          {getStatusLabel(launch.launch_success)}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            ) : (
              <div className="text-4xl font-bold text-center py-10">
                  No Data Found
              </div>
            )}
          </div>
          <Paginate
            activePage={activePage}
            setActivePage={setActivePage}
            launchCount={launchCount}
          />
        </>
      ) : (
        <p className="font-bold text-xl text-center">Loading...</p>
      )}
    </>
  );
}

export default CardList;
