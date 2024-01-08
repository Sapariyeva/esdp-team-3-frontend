import { ERole } from "@/enum/role.enum";
import { ESearchFields, EUserStatus, EUserSubject } from "@/enum/user.enum";

 const translateValue = <T extends string | number,>(value: T, dictionary: { [key in T]?: string }): string => {
    return dictionary[value] || value.toString();
};

export const statusDictionary: { [key in EUserStatus]?: string } = {
    [EUserStatus.ACTIVE]: 'Активный',
    [EUserStatus.BLOCKED]: 'Заблокированный',
    [EUserStatus.DISABLED]: 'Отключенный',
};

export const roleDictionary: { [key in ERole]?: string } = {
    [ERole.admin]: 'Администратор',
    [ERole.manager]: 'Менеджер',
    [ERole.customer]: 'Клиент',
    [ERole.performer]: 'Исполнитель',

};

export const searchFieldsDictionary: { [key in ESearchFields]?: string } = {
    [ESearchFields.DisplayName]: 'Имя',
    [ESearchFields.Email]: 'Электронная почта',
    [ESearchFields.Phone]: 'Телефон',
    [ESearchFields.IdentifyingNumber]: 'Паспорт',

};

export const subjectDictionary: { [key in EUserSubject]?: string } = {
    [EUserSubject.INDIVIDUAL]: 'ИП',
    [EUserSubject.LEGAL]: 'Юр. лицо',
};

export default translateValue
