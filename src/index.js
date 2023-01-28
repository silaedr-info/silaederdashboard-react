import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Grommet, Header, Button, Menu, Avatar, Sidebar, Nav, Heading, Main, Paragraph, Tab, Box, Tabs, Meter, Stack, Text, DataTable, TextInput, FormField, Form } from 'grommet';
import * as Icons from 'grommet-icons'
import Frame from 'react-frame-component';

const theme = {
    global: {
        font: {
            family: "Montserrat",
            size: "18px",
            height: "20px",
        },
    },
};

class Main2 extends React.Component {

    render() {
        return (
            <Grommet theme={theme} full>
                <Main pad="large" style={{ display: 'flex', flexDirection: 'row' }}>
                    <Sidebar background="brand" round="small" style={{ position: 'sticky', top: '0' }}
                        header={
                            <div>
                                <Heading className='Header' level="3">Silaeder Dashboard</Heading>
                            </div>
                        }
                        footer={
                            <div className='footerFlex'>
                                <Avatar src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=Auburn&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=Heather&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Pale" /> <Menu
                                    label="vlppz"
                                    items={[
                                        { label: 'Изменить профиль', onClick: () => { } },
                                        { label: 'Выйти', onClick: () => { } },
                                    ]}
                                />
                            </div>
                        }
                    >
                        <Nav gap="small">
                            <Button onMouseDown={(e) => e.preventDefault()} className="btn1" active={true} icon={<Icons.ServerCluster />} hoverIndicator label="Silaeder Server" />
                            <Button icon={<Icons.Workshop />} hoverIndicator label="Silaeder Conference" />
                            <Button icon={<Icons.DocumentConfig />} hoverIndicator label="Silaeder AutoDiploma" />
                        </Nav>
                    </Sidebar>
                    <main className='maincnt'>
                        <SilaederSrv />
                    </main>
                </Main>

            </Grommet>
        )
    }
}

class SilaederSrv extends React.Component {
    render() {
        var cpuVal = 50;

        var ramMax = 4024;
        var ramUsed = 1090;
        var ramPercent = ramUsed / ramMax * 100;

        var diskall = 64;
        var diskused = 15;
        var diskPercent = diskused / diskall * 100;

        return (
            <Grommet theme={theme} className='cntr' >
                <Tabs>
                    <Tab title="Главная">
                        <Box direction='row'>
                            <Box pad="medium" style={{ width: '300px' }}>
                                <Stack anchor='center'>
                                    <Meter background="light-2" type="circle" values={[{ value: cpuVal }]} size="medium" style={{ width: '250px', height: '250px' }} thickness="large" highlight="brand" />
                                    <Box direction='column' align='center' pad={{ bottom: 'xsmall' }}>
                                        <Text size='xlarge' weight='bold'>
                                            CPU:
                                        </Text>
                                        <Box direction='row' align='center'>
                                            <Text size='xlarge' weight='medium'>
                                                {cpuVal}
                                            </Text>
                                            <Text size='small'>%</Text>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box pad="medium" style={{ width: '300px' }}>
                                <Stack anchor='center'>
                                    <Meter background="light-2" type="circle" values={[{ value: ramPercent }]} size="medium" style={{ width: '250px', height: '250px' }} thickness="large" highlight="brand" />
                                    <Box direction='column' align='center' pad={{ bottom: 'xsmall' }}>
                                        <Text size='xlarge' weight='bold'>
                                            RAM:
                                        </Text>
                                        <Box direction='row' align='center'>
                                            <Text size='xlarge' weight='medium'>
                                                {Math.round(ramPercent)}
                                            </Text>
                                            <Text size='small'>%</Text>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box pad="medium" style={{ width: '300px', textAlign: 'center' }}>
                                <Stack anchor='center'>
                                    <Meter background="light-2" type="circle" values={[{ value: diskPercent }]} size="medium" style={{ width: '250px', height: '250px' }} thickness="large" highlight="brand" />
                                    <Box direction='column' align='center' pad={{ bottom: 'xsmall' }}>
                                        <Text size='xlarge' weight='bold'>
                                            Диск:
                                        </Text>
                                        <Box direction='row' align='center'>
                                            <Text size='xlarge' weight='medium'>
                                                {Math.round(diskPercent)}
                                            </Text>
                                            <Text size='small'>%</Text>
                                        </Box>
                                    </Box>
                                </Stack>
                                <Text className='mt10'>{diskused}GB / {diskall}GB</Text>
                            </Box>
                        </Box>

                        <Box align='center' margin={{bottom: '20px'}}>
                            <Heading level={3}>Информация о системе:</Heading>
                            <DataTable border={{
                                color: 'border',
                                side: 'vertical',
                                size: '1px',
                            }} columns={[
                                {
                                    property: 'name',
                                    header: <Text weight='bold'>ОС</Text>
                                },
                                {
                                    property: 'text',
                                    header: <Text>Ubuntu 22.04.1 LTS x86_64</Text>
                                },
                            ]} data={[
                                {
                                    name: <Text weight='bold'>Ядро</Text>,
                                    text: <Text>5.15.0-56-generic</Text>
                                },
                                {
                                    name: <Text weight='bold'>Время работы</Text>,
                                    text: <Text>9 дней, 8 часов, 9 минут</Text>
                                },
                                {
                                    name: <Text weight='bold'>Кол-во пакетов</Text>,
                                    text: <Text>427 (dpkg)</Text>
                                },
                                {
                                    name: <Text weight='bold'>Оболочка терминала</Text>,
                                    text: <Text>zsh 5.8.1</Text>
                                },
                                {
                                    name: <Text weight='bold'>CPU</Text>,
                                    text: <Text>DO-Premium-Intel (2) @ 2.494GHz</Text>
                                },
                                {
                                    name: <Text weight='bold'>GPU</Text>,
                                    text: <Text>00:02.0 Red Hat, Inc. QXL paravirtual graphic card</Text>
                                }
                            ]} />
                        </Box>

                        <Box align='center' margin={{bottom: '20px'}}>
                            <Heading level={3}>Действующие порты:</Heading>
                            <DataTable columns={[
                                {
                                    property: 'prot',
                                    header: <Text weight='bold'>Протокол</Text>
                                },
                                {
                                    property: 'port',
                                    header: <Text weight='bold'>Порт</Text>
                                },
                                {
                                    property: 'sost',
                                    header: <Text weight='bold'>Состояние</Text>
                                },
                                {
                                    property: 'pidprog',
                                    header: <Text weight='bold'>PID/ПРОГРАММА</Text>
                                },
                            ]} data={[
                                {
                                    prot: <Text>tcp</Text>,
                                    port: <Text>7005</Text>,
                                    sost: <Text>LISTEN</Text>,
                                    pidprog: <Text>-</Text>
                                },
                                {
                                    prot: <Text>tcp</Text>,
                                    port: <Text>7002</Text>,
                                    sost: <Text>LISTEN</Text>,
                                    pidprog: <Text>72808/python3</Text>
                                },
                                {
                                    prot: <Text>tcp</Text>,
                                    port: <Text>7001</Text>,
                                    sost: <Text>LISTEN</Text>,
                                    pidprog: <Text>57711/python3</Text>
                                },
                                {
                                    prot: <Text>tcp</Text>,
                                    port: <Text>42475</Text>,
                                    sost: <Text>LISTEN</Text>,
                                    pidprog: <Text>-</Text>
                                },
                                {
                                    prot: <Text>tcp</Text>,
                                    port: <Text>22</Text>,
                                    sost: <Text>LISTEN</Text>,
                                    pidprog: <Text>-</Text>
                                },
                            ]} />
                        </Box>
                    </Tab>
                    <Tab title="Терминал">
                        <Box pad="medium">
                            <Box style={{ height: '100vh', width: '100vh' }} pad="10px" >
                                <Form>
                                    <FormField>
                                        <TextInput placeholder="Команда"></TextInput>
                                    </FormField>
                                    <Button primary type='submit' label="Выполнить" />
                                </Form>
                                <pre>Desktop<br></br>
Documents<br></br>
Downloads<br></br>
Flutter<br></br>
Library<br></br>
Movies<br></br>
Music</pre>
                            </Box>
                        </Box>
                    </Tab>
                    <Tab title="Файлы">
                        <Box pad="medium">Two</Box>
                    </Tab>
                </Tabs>
            </Grommet>
        )
    }
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main2 />);